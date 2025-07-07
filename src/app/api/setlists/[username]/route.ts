import { NextRequest, NextResponse } from "next/server";
import { Setlists, Setlist } from "../../../../types/setlist";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username: userId } = await params;
  const { searchParams } = new URL(request.url);

  // Get page parameter from query string
  const page = parseInt(searchParams.get("page") || "1");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (page < 1) {
    return NextResponse.json(
      { error: "Invalid page parameter" },
      { status: 400 }
    );
  }

  try {
    // Get the attended setlists with pagination
    const setlistsResponse = await fetch(
      `https://api.setlist.fm/rest/1.0/user/${userId}/attended?p=${page}`,
      {
        headers: {
          Accept: "application/json",
          "x-api-key": process.env.SETLISTFM_API_KEY || "",
        },
      }
    );

    // Handle different HTTP status codes appropriately
    if (!setlistsResponse.ok) {
      if (setlistsResponse.status === 404) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      if (setlistsResponse.status === 401) {
        return NextResponse.json({ error: "Invalid API key" }, { status: 500 });
      }
      if (setlistsResponse.status === 403) {
        return NextResponse.json(
          { error: "Access forbidden" },
          { status: 500 }
        );
      }
      // For other HTTP errors, return 500
      return NextResponse.json(
        { error: "Failed to fetch setlists from external API" },
        { status: 500 }
      );
    }

    const setlistsData: Setlists = await setlistsResponse.json();
    const setlists: Setlist[] = setlistsData.setlist || [];

    // Calculate pagination info
    const total = setlistsData.total || 0;
    const totalPages = Math.ceil(total / setlistsData.itemsPerPage);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      setlists,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: setlistsData.itemsPerPage,
        hasNextPage,
        hasPreviousPage,
      },
    });
  } catch (error) {
    console.error("Error fetching setlists:", error);
    // This catch block handles network errors, JSON parsing errors, etc.
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
