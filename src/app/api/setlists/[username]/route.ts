import { NextRequest, NextResponse } from "next/server";
import { Setlists, Setlist } from "../../../../types/setlist";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username: userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Get the attended setlists directly using userId
    const setlistsResponse = await fetch(
      `https://api.setlist.fm/rest/1.0/user/${userId}/attended`,
      {
        headers: {
          Accept: "application/json",
          "x-api-key": process.env.SETLISTFM_API_KEY || "",
        },
      }
    );

    if (!setlistsResponse.ok) {
      if (setlistsResponse.status === 404) {
        throw new Error("User not found");
      }
      throw new Error("Failed to fetch setlists");
    }

    const setlistsData: Setlists = await setlistsResponse.json();
    const setlists: Setlist[] = setlistsData.setlist || [];

    return NextResponse.json({ setlists });
  } catch (error) {
    console.error("Error fetching setlists:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
