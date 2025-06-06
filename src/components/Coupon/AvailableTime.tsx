import { AvailableTimeType } from "./types";
import { getAvailableTimeDescription } from "./utils";

interface AvailableTimeProps {
  availableTime: {
    start: AvailableTimeType;
    end: AvailableTimeType;
  };
}

function AvailableTime({ availableTime }: AvailableTimeProps) {
  return <p>사용 가능 시간: {getAvailableTimeDescription(availableTime)}</p>;
}

export default AvailableTime;
