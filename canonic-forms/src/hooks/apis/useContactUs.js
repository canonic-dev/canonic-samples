const UseContactUs = async (data) => {
  const submitRequest = async (reqBody) => {
    console.log("INPUT: ", reqBody);
    try {
      const res = await fetch(
        "https://canonic-forms.can.canonic.dev/api/contactuses",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: reqBody }),
        }
      );
      const json = await res.json();
      return { response: json, error: undefined };
    } catch (error) {
      return { response: undefined, error: error };
    }
  };

  return await submitRequest(data);
};

export default UseContactUs;
