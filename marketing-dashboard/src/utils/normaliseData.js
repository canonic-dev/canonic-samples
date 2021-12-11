export const normaliseTwitterData = (twitter) => {
  if (Object.keys(twitter).length === 0) {
    return { accountInformation: {}, metrics: [] };
  }

  const twitterData = twitter.twitter;
  return {
    accountInformation: {
      title: "Account Infomation",
      username: `@${twitterData.username}`,
      description: twitterData.description,
      location: twitterData.location,
    },
    metrics: [
      {
        title: "Followers",
        description: twitterData.public_metrics.followers_count,
      },
      {
        title: "Following",
        description: twitterData.public_metrics.following_count,
      },
      {
        title: "Tweets",
        description: twitterData.public_metrics.tweet_count,
      },
      {
        title: "Listed",
        description: twitterData.public_metrics.listed_count,
      },
    ],
  };
};

export const normaliseYoutubeMetrics = (youtubeData) => {
  return (
    youtubeData.columnHeaders.map((column, index) => {
      return {
        title: camelCaseToSentenceCase(column.name),
        description: youtubeData.rows[0][index],
      };
    }) || []
  );
};

export const normaliseEstimatedMinutesWatched = (estimatedMinutes) => {
  const labels =
    estimatedMinutes.rows.map((row) => {
      return row[0];
    }) || [];

  const data = estimatedMinutes.rows.map((row) => {
    return `${row[1]}`;
  });

  return {
    labels,
    datasets: [
      {
        label: "Minutes Watched / Day",
        data,
        fill: true,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
      },
    ],
  };
};

export const normaliseEstimatedMinutesPerCountry = (
  estimatedMinutesCountry
) => {
  const labels =
    estimatedMinutesCountry.rows.map((row) => {
      return row[0];
    }) || [];

  const data = estimatedMinutesCountry.rows.map((row) => {
    return `${row[1]}`;
  });

  return {
    labels,
    datasets: [
      {
        label: "Minutes Watched / Country",
        data,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
};

const camelCaseToSentenceCase = (text) => {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
