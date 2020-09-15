
function useNiceCorners(xAxis, yAxis, pos1, pos2){
    const co1 = getCoordinates(xAxis, yAxis, pos1);
    const co2 = getCoordinates(xAxis, yAxis, pos2);
    console.log(co1, co2);
    const final1 = {}, final2 = {};
    if (co1.x < co2.x){
        final1.x = co1.x;
        final2.x = co2.x;
    } else {
        final1.x = co2.x;
        final2.x = co1.x;
    }
    if (co1.y < co2.y){
        final1.y = co1.y;
        final2.y = co2.y;
    } else {
        final1.y = co2.y;
        final2.y = co1.y;
    }
    return {
        pos1: final1,
        pos2: final2,
    }
}

function getCoordinates(xAxis, yAxis, pos){
    return {
        x: xAxis(pos.x),
        y: yAxis(pos.y)
    };
}
 export default useNiceCorners;
