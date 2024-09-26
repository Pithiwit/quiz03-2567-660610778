import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Pithiwit",
    studentId: "660610778",
  });
};
