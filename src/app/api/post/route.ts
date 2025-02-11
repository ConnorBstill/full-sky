import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { TID } from "@atproto/common";

import { schemaDict } from "~/lexicon/lexicons";
import {
  FullskyPostRecord,
  validateRecord,
} from "~/lexicon/types/com/fullsky/post";

import { ResponseBuilder } from "~/lib/response-builder";
import { createClient, getSessionAgent } from "~/lib/auth";

export const POST = async (req: NextRequest) => {
  try {
    const oauthClient = await createClient();
    const sessionCookies = await cookies();
    const agent = await getSessionAgent(sessionCookies, oauthClient);

    if (!agent) {
      console.error("No session");
      return new NextResponse(ResponseBuilder(null, "Session required", true));
    }

    const { postBody, createdAt } = await req.json();

    const rkey = TID.nextStr();
    const fullskyPostRecord: FullskyPostRecord = {
      $type: schemaDict.ComFullskyPost.id,
      body: postBody,
      createdAt,
    };

    if (!validateRecord(fullskyPostRecord).success) {
      console.error(
        "[ERROR] invalid record",
        validateRecord(fullskyPostRecord),
      );
      return new NextRequest(ResponseBuilder(null, "invalid record", true));
    }

    const putRecordRes = await agent.com.atproto.repo.putRecord({
      repo: agent.assertDid,
      collection: schemaDict.ComFullskyPost.id,
      rkey,
      record: fullskyPostRecord,
      validate: false,
    });

    const postUri = putRecordRes.data.uri;

    return new NextResponse(ResponseBuilder({ postUri }, "success", false));
  } catch (err) {
    console.error("App error in api/oauth/initiate", err);
    return new NextResponse(
      ResponseBuilder(null, "error in POST /api/post", true),
    );
  }
};
