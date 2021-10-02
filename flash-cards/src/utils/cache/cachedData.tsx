import {useState, useEffect} from "react";
import { getLessons } from "../server/serverCalls";


export const cache: any = {
    lessons: []
};

export function useCachedData(): any {
    const [lessons, setLessons] = useState([]);
    console.log("here we are");
    const setLessonsCache: any = async () => {
        if (cache.lessons.length === 0){
            try{
                const data = await getLessons();
                cache.lessons = data;
                setLessons(data);
            }
            catch(err) {
                cache.lessons = [];
            }
        }
        else{
            setLessons(cache.lessons);
        }
    };

    useEffect(() => {
        (async () => await setLessonsCache())();
    }, []);

    return lessons;
}