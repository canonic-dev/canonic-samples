import {
  uniqueNamesGenerator,
  starWars,
  animals,
} from "unique-names-generator";

const config = {
  dictionaries: [starWars, animals],
};

export const getNewNickname = () => uniqueNamesGenerator(config);
