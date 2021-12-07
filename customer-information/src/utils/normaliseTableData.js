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

export const getRows = (customers) => {
  return (customers ?? []).map((customer) => {
    const hubspotData = customer.hubspot.properties;
    const stripeData = customer.stripe;
    return {
      name: stripeData.name,
      email: hubspotData.email,
      phone: hubspotData.phone,
      company: hubspotData.company,
      address:
        `${stripeData.address.line1},` +
        ` ${stripeData.address.city},` +
        ` ${stripeData.address.state},` +
        ` ${stripeData.address.country}` +
        ` - ${stripeData.address.postal_code}`,
      balance: stripeData.balance,
    };
  });
};
