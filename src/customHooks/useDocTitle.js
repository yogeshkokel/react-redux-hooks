import { useEffect } from 'react';

function useDocTitle(title) {
    //get title from props
    //and set document title
    useEffect(() => {
        document.title = title;
    })
}

export default useDocTitle;