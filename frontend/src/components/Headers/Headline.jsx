import customTheme from '../../customTheme/customTheme'

export default function Headline({weight}) {
    return(
    <>
        <h1 style={{
            textAlign:"center",
            color: "text.secondary",
            fontFamily: "cursive",
            fontSize: weight
        }}>Newbond</h1>
    </>
    );
}