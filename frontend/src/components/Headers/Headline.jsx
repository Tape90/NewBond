import customTheme from '../../customTheme/customTheme'

export default function Headline({weight,text}) {
    return(
    <>
        <h1 style={{
            textAlign:"center",
            color: "text.secondary",
            fontFamily: "cursive",
            fontSize: weight
        }}>{text ? text : "Newbond"}</h1>
    </>
    );
}