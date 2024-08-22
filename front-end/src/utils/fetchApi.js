async function fetchApi(path, method = "GET", body = null) {
  // path "/login"  method POST
  try {
    if (
      (method === "PUT" && path !== "/login") ||
      (method === "POST" && path === "/stages/")
    ) {
      {
        const resp = await fetch(import.meta.env.VITE_API_URL + path, {
          method: method,
          headers: {
            Authorization: localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : null,
          },
          body: body,
        });
        if (!resp.ok) {
          alert("Errore durante l'invio dei dati: " + (await resp.text()));
        }

        return await resp.json();
        // }
      }
    } else {
      console.log(import.meta.env.VITE_API_URL + path, "path");

      const resp = await fetch(import.meta.env.VITE_API_URL + path, {
        method,
        headers: {
          "Content-Type": body instanceof FormData ? null : "application/json",
          Authorization: localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : null,
        },
        body: body ? JSON.stringify(body) : null,
      });
      console.log(resp, "resp");

      const data = await resp.json();

      if (!resp.ok) {
        if (data.error === "TokenExpiredError" || data.error === "AuthError") {
          localStorage.removeItem("token");
          window.location = "/login";
        }

        throw new Error(data.msg ?? data[0].msg);
      }
      return data;
    }
  } catch (err) {
    console.log(err.message);
  }
}

export default fetchApi;
