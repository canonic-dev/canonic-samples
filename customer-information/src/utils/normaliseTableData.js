// Gets all the columns that needs to be displayed along with the source from which they are being populated.
export const getColumns = () => {
  return {
    name: "Stripe",
    email: "Hubspot",
    phone: "Hubspot",
    company: "Hubspot",
    address: "Stripe",
    balance: "Stripe",
  };
};

// Takes in the data coming, normalises it and returns an array of rows.
export const getRows = (customers) => {
  return (customers ?? []).map((customer) => {
    const hubspotData = customer.hubspotCustomer.properties;
    const stripeData = customer.stripeCustomer;
    return {
      name: stripeData.name,
      email: hubspotData.email,
      phone: hubspotData.phone,
      company: hubspotData.company,
      address:
        `${stripeData.address.line1},` +
        ` ${stripeData.address.city},` +
        ` ${stripeData.address.country}`,
      balance: stripeData.balance,
    };
  });
};
