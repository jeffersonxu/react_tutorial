function is_conflict(a, b){
    if(a.term === b.term){        
        const parsedDays1 = a.meets.split(" ")[0].split(/(?=[A-Z])/);
        const parsedDays2 = b.meets.split(" ")[0].split(/(?=[A-Z])/);
        if(parsedDays1.some((d) => parsedDays2.includes(d))){
            const s1 = a.meets.split(" ")[1].split("-")[0];
            const e1 = a.meets.split(" ")[1].split("-")[1];
          
            const s2 = b.meets.split(" ")[1].split("-")[0];
            const e2 = b.meets.split(" ")[1].split("-")[1];

            if((s1 >= s2 && s1 < e2) || (e1 > s2 && s2 <= e2)){
                return true;
            }        
        }        
    }

    return false;
}

function updateConflicts(selected, courses) {
    const disabled = [];
    selected.forEach(selectedCourse =>
      Object.entries(courses).forEach(([_, course]) => {
        if (!disabled.includes(course) && course !== selectedCourse && is_conflict(courses[selectedCourse], course)) {
            disabled.push(course);          
        }
      })
    );
    return disabled;
  };

export default updateConflicts;