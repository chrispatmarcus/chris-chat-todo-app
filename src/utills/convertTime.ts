import moment from "moment";

export default function convertTime(data_input:string) {
  return moment(data_input).format("");
}
