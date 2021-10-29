const UseGetDemo = async (data) => {
  const submitRequest = async (reqBody) => {
    try {
      const res = await fetch(
        "https://canonic-forms.can.canonic.dev/api/getDemos",
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

export default UseGetDemo;
