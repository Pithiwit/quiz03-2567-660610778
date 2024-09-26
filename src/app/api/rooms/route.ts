import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  const roomList = [];
  let counter = 0;
  for (const room of DB.rooms) {
    roomList.push(room.roomId,room.roomName);
    counter++;
  }
  return NextResponse.json({
    ok: true,
    rooms: roomList,
    totalRooms: counter,
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  if(!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  readDB();
  const body = await request.json();
  const {roomName} = body;
  const foundroom = DB.find(
    (x) => x.roomName === roomName);
  if (foundroom) {
      return NextResponse.json(
        {
          ok: false,
          message: `Room ${roomName} already exists`,
        },
        { status: 400 }
      );
  }
  DB.rooms.push(roomName);
  return NextResponse.json({
    ok: true,
    // roomId,
    message: `Room ${roomName} has been created`,
  })

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: `Room ${"replace this with room name"} already exists`,
  //   },
  //   { status: 400 }
  // );

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    //roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
