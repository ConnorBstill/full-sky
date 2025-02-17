import Image from "next/image";

import { DateTime } from "luxon";

import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

interface UserInfoProps {
  profile: ProfileViewDetailed;
  postCreatedAt: string;
}

const UserInfo = ({ profile, postCreatedAt }: UserInfoProps) => {
  return (
    <div className="flex text-base">
      <Image
        src={profile.avatar}
        width={42}
        height={42}
        className="mr-1 cursor-pointer rounded-full border"
        alt={`${profile.displayName}'s avatar`}
      />

      <div>
        <span className="mr-1 cursor-pointer font-bold">
          {profile.displayName}Connor Steele
        </span>
        <span className="mr-1 cursor-pointer text-gray-300">
          @{profile.handle}
        </span>

        <div>
          <span className="text-gray-300">
            {DateTime.fromISO(postCreatedAt).toLocaleString(
              DateTime.DATETIME_MED,
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export { UserInfo };
