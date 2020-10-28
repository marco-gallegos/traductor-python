import Axios from "axios";
import { API_URL } from "../constants";

export function sendSourceCode(sourceCode) {
  return Axios.post(API_URL, {
    sourceCode: sourceCode
  })
  .then((response) => {
    console.log(response);
    return response.data;
  });
}
