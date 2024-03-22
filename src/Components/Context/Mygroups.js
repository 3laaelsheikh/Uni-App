import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const mygroupsContext = createContext();


export function MyGroupsContextProvider({ children }) {

    const [myGroups, setMyGroups] = useState(null);
    const [subjectName, setSubjectName] = useState(null);
    const [subjectGroup, setSubjectGroup] = useState(null);
    const [description, setDescription] = useState(null);
    const [majore, setMajore] = useState(null);
    const [year, setYear] = useState(null);
    const [numberOfLiked , setNumberOfLiked] = useState(null);

    const [startedGroups, setStartedGroups] = useState();


    


    async function getMyGroups() {
        try {
            const { data } = await axios.get("https://sinai-college-project.onrender.com/api/v1/user/groups", {
                headers: { Authorization: localStorage.getItem("tkn") }
            })


            console.log(data);
            setMyGroups(data.groups);
            setSubjectName(data.groups.subject_name);
            setSubjectGroup(data.groups.subject_group);
            setDescription(data.groups.description);
            setMajore(data.groups.majore);
            setYear(data.groups.year);
            setStartedGroups(data.user.stared_groups);
            setNumberOfLiked(data.number_of_liked_groups)


        }
        catch (err) {
            console.log("error", err);
        }

    }

    async function updateStarPackage(_id, value) {

        try {
            const { data } = await axios.post(`https://sinai-college-project.onrender.com/api/v1/users/groups/${_id}/starGroup`, value,
                {
                    headers: { Authorization: localStorage.getItem("tkn") }
                });

            console.log(data);
            setStartedGroups(data.user.stared_groups);


            return data;

        } catch (error) {
            console.log("error", error);
        }

    }

    useEffect(() => {
        setStartedGroups();
        updateStarPackage();
    }, []);

  return <mygroupsContext.Provider value={{getMyGroups,myGroups,subjectName,subjectGroup,description,majore,year,updateStarPackage,setStartedGroups,startedGroups,numberOfLiked,setNumberOfLiked}}>
  {children}
  </mygroupsContext.Provider>;
}