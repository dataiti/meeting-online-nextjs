import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCalling, setIsCalling] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (calls.length > 0) setCall(calls[0]);

        setIsCalling(false);
      } catch (error) {
        console.error(error);
        setIsCalling(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCalling };
};

export default useGetCallById;
