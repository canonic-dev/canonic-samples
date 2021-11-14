const useCustomerInformation = async (data) => {
  const url = "https://canonic-forms.can.canonic.dev/api/contactuses";

  const submitRequest = async (reqBody) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: reqBody }),
      });
      const json = await res.json();
      return { response: json, error: undefined };
    } catch (error) {
      return { response: undefined, error: error };
    }
  };

  return await submitRequest(data);
};

export default useCustomerInformation;
