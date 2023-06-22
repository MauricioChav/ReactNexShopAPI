import React from "react";
import ClientBox from "./ClientBox";

function ClientBoxArray(props) {

    return (
        <div>
            {props.array.map((client_box) => (
                <ClientBox key={"client_" + client_box.id} content={client_box} />
            ))}       
        </div>
    );

}

export default ClientBoxArray;