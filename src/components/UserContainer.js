import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetails } from '../store/users/userActions'

import { useDropzone } from 'react-dropzone'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import logo from '../road.jpg';

function UserContainer(props) {
    const [image, setImage] = useState(logo);
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        acceptedFiles.forEach((file) => {
            setImage(URL.createObjectURL(file))
            // const reader = new FileReader()

            // reader.onabort = () => console.log('file reading was aborted')
            // reader.onerror = () => console.log('file reading has failed')
            // reader.onload = () => {
            //     // Do whatever you want with the file contents
            //     // setImage(file)

            //     console.log('file.preview :>> ', file.preview);
            //     const binaryStr = reader.result
            //     console.log(binaryStr)
            // }
            // reader.readAsArrayBuffer(file)
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const [cropData, setCropData] = useState('#');
    const [cropper, setCropper] = useState();
    const imageRef = useRef(null);

    const getCropData = () => {
        if (typeof cropper !== 'undefined') {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    const user_id = props.location.user_id ? props.location.user_id : props.match.params.user_id;
    const userDetails = useSelector(state => state.user.singleUserData);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserDetails(user_id))
    }, [])

    return (
        <div>
            {
                userDetails
                    ?
                    <div>
                        Name: {userDetails.name}<br></br>
            Phone: {userDetails.phone}<br></br>
            Email: {userDetails.email}<br></br>
            Website: {userDetails.website}<br></br>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                            }
                        </div>
                        <Cropper
                            src={image}
                            style={{ height: 400, width: '100%' }}
                            initialAspectRatio={16 / 9}
                            preview=".img-preview"
                            guides={true}
                            ref={imageRef}
                            dragMode={'move'}
                            guides={false}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                        />
                        <div className="box" style={{ width: '50%', float: 'right' }}>
                            <h1>Preview</h1>
                            <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
                        </div>
                        <div className="box" style={{ width: '50%', float: 'right' }}>
                            <h1>
                                <span>Crop</span>
                                <button style={{ float: 'right' }} onClick={getCropData}>
                                    Crop Image
                        </button>
                            </h1>
                            <img style={{ width: '100%' }} src={cropData} alt="cropped image" />
                        </div>
                    </div>

                    : ''}

        </div>
    );
}

export default UserContainer;