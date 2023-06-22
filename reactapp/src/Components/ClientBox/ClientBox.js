import React from "react";

import "./ClientBox.css"

function ClientBox(props) {

    const birthday = new Date(props.content.birthday);

    return (
        <>
            <table className="clientTable">
                <tbody>
                    <tr>
                        <td className="infoTitle">Id:</td>
                        <td>{props.content.id}</td>
                    </tr>
                    <tr>
                        <td className="infoTitle">FirstName:</td>
                        <td>{props.content.firstName}</td>
                    </tr>
                    <tr>
                        <td className="infoTitle">LastName:</td>
                        <td>{props.content.lastName}</td>
                    </tr>
                    <tr>
                        <td className="infoTitle">Email:</td>
                        <td>{props.content.email}</td>
                    </tr>
                    <tr>
                        <td className="infoTitle">Birthday:</td>
                        <td>{isNaN(birthday) ? "" : birthday.toLocaleDateString()}</td>
                    </tr>
                </tbody>
            </table>

            {
                props.content.address != null &&
                <table className="clientTable">
                        <thead>
                            <tr>
                                <th>Address Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="infoTitle">AddressId:</td>
                                <td>{props.content.addressId}</td>
                            </tr>

                            <tr>
                                <td className="infoTitle">Country:</td>
                                <td>{props.content.address.country}</td>
                            </tr>

                            <tr>
                                <td className="infoTitle">State:</td>
                                <td>{props.content.address.state}</td>
                            </tr>

                            <tr>
                                <td className="infoTitle">City:</td>
                                <td>{props.content.address.city}</td>
                            </tr>

                            <tr>
                                <td className="infoTitle">Street:</td>
                                <td>{props.content.address.street}</td>
                            </tr>

                            <tr>
                                <td className="infoTitle">Zip Code:</td>
                                <td>{props.content.address.zipCode}</td>
                            </tr>

                        
                    </tbody>
                </table>


            }

            
        </>
            
    );

}

export default ClientBox;