'use client'

import convertDateTimeToTime from "@/helpers/convertDateTimeToTime";
import convertTimeToDateTime from "@/helpers/convertTimeToDateTime";
import { useEffect, useState } from "react";

export default function Home() {

  console.log(convertDateTimeToTime('2025-02-14T00:00:00'))

  useEffect(() => {


  }, [])

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
