import React from "react";
import Navbar from "./Nav";

export default function Layout(props: any) {
  return (

    <div className="py-0 ">
        <Navbar/>
        {props.children}
    </div>
  );
}
