import React from 'react'
export default function CertificateDetails(props) {
    let { id } = props
    return (
        <div>
            <Certificates id={id}/>
        </div>
    )
}
