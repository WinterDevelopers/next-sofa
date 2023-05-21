export default function loadingAnime(boolean){
    if(boolean===true)[
        document.getElementById('loader-container').className='loader-container'
    ]
    else if(boolean===false){
        document.getElementById('loader-container').className='no-display'

    }
}