import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Filterdgroup = () => {

    const [filterdGroup, setFilterdGroup] = useState(null);



    async function joinGroup(_id) {

        try {
            const { data } = await axios.put(`https://sinai-college-project.onrender.com/api/v1/join/${_id}`, {},
                {
                    headers: { Authorization: localStorage.getItem("tkn") }
                });

            if (data.message === "join group requested") {
                toast.success(data.message)
            }
            if(data.message === "You are already a member of this group") {
                toast.error("You are already a member of this group")
            }

            return data;

        } catch (error) {
            console.log("error", error);
        }

    }

  



    return <>
    
    {/* start nav */}
    <section className=''>
            <div className='d-flex justify-content-center my-5'>
                <ul className="nav nav-underline">

                    <li className="nav-item">
                        <Link className="nav-link " to={'/mygroup'}>My Groups</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/groups'}>Join Group</Link>
                    </li>

                </ul>
            </div>
        </section>
        {/* end nav */}

        <section>
            <div className='bg-secondary-subtle container rounded-3 my-5 w-75 overflow-y-scroll' style={{ height: "618px" }}>
                <div className="container">
                    <div className="row gy-3 py-3">
                        {filterdGroup ? <>{filterdGroup.map(function (elm, idx) {
                            return <div key={idx} className="col-lg-4 col-md-6">
                                <div onClick={() => joinGroup(elm._id)} className='shadow bg-white rounded-3 p-3 overflow-x-hidden'>
                                    <div className="d-flex align-baseline">
                                        <div className="rounded-5 d-flex align-items-center justify-content-center " style={{ width: "60px", height: "60px", backgroundColor: "rgba(255, 161, 81, 1)" }}>
                                            <h2 className='text-white pt-2'>{elm.subject_name.split(' ').map(word => word.charAt(0)).join('')}</h2>
                                        </div>
                                        <div className='mx-3'>
                                            <h5 className='fw-bold'>{elm.subject_name}</h5>
                                            <p className='text-muted'>{elm.subject_group}</p>
                                        </div>
                                    </div>
                                    <p className="text-muted">{elm.description}</p>
                                </div>
                            </div>
                        })}</> : <>
                            <div className="d-flex justify-content-center align-items-center">
                                <RotatingLines
                                    strokeColor="rgba(82, 95, 224, 1)"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="96"
                                    visible={true}
                                />
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </section>
    
    </>
}

export default Filterdgroup;
