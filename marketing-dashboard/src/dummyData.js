export const dummyData = {
  metric: {
    youtubeMetrics: {
      rows: [[745, 2, 16, 1, 597, 48]],
      columnHeaders: [
        {
          columnType: "METRIC",
          dataType: "INTEGER",
          name: "views",
        },
        {
          columnType: "METRIC",
          dataType: "INTEGER",
          name: "comments",
        },
        {
          columnType: "METRIC",
          dataType: "INTEGER",
          name: "likes",
        },
        {
          columnType: "METRIC",
          dataType: "INTEGER",
          name: "dislikes",
        },
        {
          columnType: "METRIC",
          dataType: "INTEGER",
          name: "estimatedMinutesWatched",
        },
        {
          columnType: "METRIC",
          dataType: "INTEGER",
          name: "averageViewDuration",
        },
      ],
    },
    youtubeMinutesDay: {
      rows: [
        ["2020-10-17", 0],
        ["2020-10-18", 1],
        ["2020-10-19", 4],
        ["2020-10-20", 0],
        ["2020-10-21", 4],
        ["2020-10-22", 4],
        ["2020-10-23", 1],
        ["2020-10-24", 4],
        ["2020-10-25", 0],
        ["2020-10-26", 1],
        ["2020-10-27", 0],
        ["2020-10-28", 0],
        ["2020-10-29", 0],
        ["2020-10-30", 1],
        ["2020-10-31", 0],
        ["2020-11-01", 1],
        ["2020-11-02", 1],
        ["2020-11-03", 2],
        ["2020-11-04", 5],
        ["2020-11-05", 0],
        ["2020-11-06", 1],
        ["2020-11-07", 0],
        ["2020-11-08", 5],
        ["2020-11-09", 3],
      ],
      columnHeaders: [
        {
          columnType: "DIMENSION",
          dataType: "STRING",
          name: "day",
        },
        {
          columnType: "METRIC",
          dataType: "INTEGER",
          name: "estimatedMinutesWatched",
        },
      ],
    },
    youtubeMinutesCountry: {
      rows: [
        ["IN", 30],
        ["US", 12],
      ],
      columnHeaders: [
        {
          columnType: "DIMENSION",
          dataType: "STRING",
          name: "country",
        },
        {
          columnType: "METRIC",
          dataType: "INTEGER",
          name: "estimatedMinutesWatched",
        },
      ],
    },
    twitter: {
      data: {
        name: "Canonic",
        username: "CanonicHQ",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1316281577148571653/-12Ans7U_normal.jpg",
        location: "United States",
        description:
          "The lowcode backend to your frontend. Ranked #3 Product of the day on @producthunt #lowcode #nocode #reactjs #graphql #technology #automation #backend",
        public_metrics: {
          followers_count: 394,
          following_count: 641,
          tweet_count: 161,
          listed_count: 25,
        },
      },
    },
  },
};
