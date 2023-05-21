export default function imageSliderFunction(){
        const images = document.querySelectorAll(".product-images");
        let slider = 0;
        let image_length = 0;
        let current_bottom = 0;
        
        function imageSlider(){
            
            images.forEach((a)=>{
                a.className='no-display product-images'
                image_length += 1
                
            });
            
            images[slider].className='product-images'
            let next_image = document.querySelector('.nxt-img')
            let prev_image = document.querySelector('.prev-img')

            next_image.addEventListener("click",()=>{
                changeImage(1)
            })
            prev_image.addEventListener("click",()=>{
                changeImage(-1)
            })

            bottomIndicator()
            return image_length
        };

        imageSlider();

        function updateImage(images, slider){
            images.forEach((a)=>{
                a.className='no-display'
            })
            images[slider].className='product-images'
            changeImageBottom(slider)
        }

        function changeImage(n){
            slider += n
            if(slider<image_length && slider >= 0){
                updateImage(images,slider)
            }
            else if(slider < 0){
                slider = image_length -1;
                updateImage(images,slider)
            }
            else{
                slider = 0
                updateImage(images,slider)
            }
        }

        function bottomIndicator(n=current_bottom){
            let bottom_indicators = document.querySelector('.bottom-indicators')
            bottom_indicators.innerHTML=''
            for(let q = 0; q<image_length; q++){
                bottom_indicators.innerHTML+=`<span class="bottom-indicator"></span>`
            }
            changeBottomIndicator(n)
        }
        

        function changeBottomIndicator(n){
            const bott =  document.querySelectorAll('.bottom-indicator');
            for(let a = 0; a<bott.length; a++){
                bott[a].addEventListener("click",()=>{
                    changeImageBottom(a)
                })
            }
            bott[n].className="bottom-indicator-active";
        };

        function changeImageBottom(n){
                slider = n
                images.forEach((a)=>{
                    a.className='no-display product-images'
                })
                images[n].className='product-images'
                document.querySelector('.bottom-indicator-active').className='bottom-indicator';
                const bott =  document.querySelectorAll('.bottom-indicator');
                bott[n].className="bottom-indicator-active";
        };
    };
    