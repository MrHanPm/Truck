export default function handleScroll(e) {
    let BOX = e.target
    let PB = BOX.dataset.pb
    let SH,WH,ST,F
    SH = BOX.scrollHeight
    WH  = window.screen.height-PB
    ST = BOX.scrollTop
    F = SH - WH - ST
    // console.log(this.state.iaLod,F)
    if(F <= 0){
        if(this.state.iaLod){
            this.upDATA()
        }
    }
}
