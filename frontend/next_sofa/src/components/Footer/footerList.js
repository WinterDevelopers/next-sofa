import { useState } from "react"

export default function FooterList(props) {
    let [show, setShow] = useState(false)

    const toggleFooterItem = () => {
        setShow(!show)
    }
    const reveal = "footer-content-list winter-footer"
    const conceal = "footer-content-list no-display-min"
    return <>
        <div class="footer-header">
                <h3>{props.header_name}</h3>
                {show?<img src="../assets/icons/minus.svg" alt="" class="no-display-max show-footer-list" onClick={toggleFooterItem}></img>
                    :<img src="../assets/icons/add.svg" alt="" class="no-display-max show-footer-list" onClick={toggleFooterItem}></img>}
        </div>

        <div class={show?reveal:conceal}>
            {props.children}
        </div>
    </>
}