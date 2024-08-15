import { validateForm } from "./validateForm";
import fetchApi from "./fetchApi";

export async function handleFormSubmit(e, content) {
  e.preventDefault();
  if (validateForm(content)) {
    // Form is valid, you can submit or process the data here
    console.log("Form data:", formData);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    console.log(formDataToSend, "send");
    const data = await fetchApi(
      "/" + `${conent}` + "s/",
      "POST",
      formDataToSend
    );

    setCreated(true); // Set a submitted flag

    navigate("/" + `${content}` + "s/" + data.id);
  } else {
    // Form is not valid, display error messages
    Error("Error when sending data");
  }
}
