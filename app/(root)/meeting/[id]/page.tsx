"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

import useGetCallById from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";
import Alert from "@/components/Alert";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";

const Meeting = () => {
  const { id } = useParams();
  const { user, isLoaded } = useUser();
  const { call, isCalling } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCalling) return <Loader />;

  if (!call) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  }

  // https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed =
    call.type === "invited" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed)
    return <Alert title="You are not allowed to join this meeting" />;

  return (
    <div className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupComplete ? (
            <MeetingRoom />
          ) : (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  );
};

export default Meeting;
