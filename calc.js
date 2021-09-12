
"use strict";


const pageLoader = {

    active(){

        // ------------------>



        // List of visual component used for this project are as follows:
        // 1. Introduction page: which displays the loader and
            // big calculator image.

        // 2. IntroImg: which is the big image that bounces after
            //window is loaded.

        // 3. LoaderContainer: Wraps the text("loading") and the loader.
        
        // 4. Loader: is basically the loading animation that displays below
            // the text("loading...").
        
        // 5. Cal: Is the calculator shown after all as been finished.

        // 6. TipContainer: Is a brief guide that shows how the calculator
            // is used and what function each component works for.

        const 
        [
            loaderDoc,
            introImg,
            loaderContainer,
            loader,
            cal,
            tipContainer
        ] =
        [
            document.querySelector('.page-intro'),
            document.querySelector('.intro-img-wrapper'),
            document.querySelector('.intro-loader-title'),
            document.querySelector('.loader-indicator'),
            document.querySelector('.cal-wrapper'),
            document.querySelector('.tip-container')
        ]


        // -------------------->



        // ------------------->

        // Each component fires at different time...

        !function(){
            introImg.classList.add('bg-img--js');
            const animationTimeSetter = {
                mainPageLoad: function(){
                    setTimeout(() =>{
                        loaderContainer.classList.replace('visibility--hidden','visibility--visible');
                    }, 4500);
                },
                loaderStraw: function(){
                    setTimeout(() =>{
                        loader.classList.add('load--js');
                    }, 4700);
                },

                cc_a: function(){
                    setTimeout(() =>{
                        loaderDoc.classList.add('hide');
                        cal.classList.remove('hide');
                    }, 25000);
                },

                tip: function(){
                    setTimeout(() =>{
                        tipContainer.classList.remove('hide');
            
                        // Call tips.call() after 26.1 seconds
                        tips.call();
                    }, 26100);
                }
            }

            animationTimeSetter.mainPageLoad();
            animationTimeSetter.loaderStraw();
            animationTimeSetter.cc_a();
            animationTimeSetter.tip();
        }();
        

        // --------------------->


    }
}

const tips = {


    // call function is iniatialized
    call(){


        setTimeout(() =>{
            const tip = document.querySelector('.first-box');
            tip.classList.replace('opcty-zero','opacity--true');
        }, 1000);


    },

    activeUserTips(e){


        const userTipParentContainer = document.querySelector('.helper-content-wrapper');
        if(e.target.classList.contains('confirm--js')){
            if(userTipParentContainer.children){
                const tipBoxes = [...document.querySelectorAll('.helper-box')];
                tipBoxes.forEach(item =>{
                    if(item.classList.contains('opacity--true')){
                        item.classList.replace('opacity--true', 'opcty-zero');
                        tipBoxes.shift();
                    }
                });
                if(tipBoxes.length){
                    tipBoxes[0].classList.replace('opcty-zero','opacity--true');
                }
                setTimeout(() =>{
                    userTipParentContainer.children[0].remove();
                }, 505);
            }
        }
        
        
    },

    closeUserTip(){


        const userTipParentContainer = document.querySelector('.helper-content-wrapper');
        const tipContainer = document.querySelector('.tip-container');
        const interval = setInterval(() => {
            if(!userTipParentContainer.children.length){
                tipContainer.classList.add('hide');
                clearInterval(interval);
            }
        }, 0);


    }

}

const calculator = {

    displayValue(e){


        const lastEntry = document.querySelector('.entry');
        const inputField = document.querySelector('.input-area');
        if(e.target.hasAttribute('type') && !e.target.hasAttribute('id')){
            const opras = [...document.querySelectorAll('.divide--js, .times--js, .minus--js, .plus--js')];
            inputField.value+=e.target.value;
            const arrOfValue = inputField.value.split('');
           
            if(e.target.classList.contains('operator')){
                lastEntry.textContent = inputField.value;
            }
            opras.forEach(items =>{
                if(arrOfValue.indexOf(items.value) === 0){
                    arrOfValue.splice(0, arrOfValue.length);
                    inputField.value = arrOfValue.join('');
                    lastEntry.textContent = `0 ${e.target.value} `;
                }
            });
           
        }


    },

    evaluate(){


        const inputField = document.querySelector('.input-area');
        const lastEntry = document.querySelector('.entry');
        let arrayOfVal = [...inputField.value.split('')];
        const operators = ['*', '/', '+', '-'];
        const elTimes = document.querySelector('.times--js');
        const elDivide = document.querySelector('.divide--js');
        const opras = [...document.querySelectorAll('.divide--js, .times--js, .minus--js, .plus--js')];
        const ul = document.querySelector('ul.hstry-list');
        const li = document.createElement('li');
        const span = document.createElement('span');
        const div = document.createElement('div');



        if(inputField.value){

            const excludeNonOperators = () =>{
                arrayOfVal.forEach(text => {
                    if(text === elTimes.value){
                        arrayOfVal[arrayOfVal.indexOf(text)] = operators[0]
                    }else if(text === elDivide.value){
                        arrayOfVal[arrayOfVal.indexOf(text)] = operators[1];
                    }
                });
                return arrayOfVal;
            }
            
            if(arrayOfVal.includes(opras[0].value) || arrayOfVal.includes(opras[1].value) || arrayOfVal.includes(opras[2].value) || arrayOfVal.includes(opras[3].value)){

                lastEntry.textContent = `${inputField.value} =`;

        
                const toString = excludeNonOperators().join('');
                inputField.value = eval(toString);
    
    
            }else if(lastEntry.textContent){

                arrayOfVal = lastEntry.textContent.split('');

                arrayOfVal.forEach(item =>{
                    if(item === ' '){
                        arrayOfVal.splice(arrayOfVal.indexOf(item), 1);
                    }
                });

                if(arrayOfVal.length === 2){
                    arrayOfVal.push(inputField.value);
                    lastEntry.textContent = `${arrayOfVal.join('')} =`;
                    inputField.value = eval(excludeNonOperators().join(''));

                }else{
                    arrayOfVal.map(text => {
                        if(text === '='){
                            arrayOfVal.splice(arrayOfVal.indexOf(text), 1);
                        }
                    });

                    for(let item of arrayOfVal){
                        if(item === operators[2] || item === operators[3] || item === elDivide.value || item === elTimes.value){
                            arrayOfVal = arrayOfVal.slice(arrayOfVal.indexOf(item), arrayOfVal.length);
                            break;
                        }
                    }
    
                    arrayOfVal.unshift(inputField.value);
                    lastEntry.textContent = `${arrayOfVal.join('')} =`;
                    inputField.value = eval(excludeNonOperators().join(''));
                }


            }

            div.textContent = lastEntry.textContent;
            li.appendChild(div);

            span.textContent = inputField.value;
                li.appendChild(span);
    
                ul.prepend(li);
    
                li.classList.add('hide');
                li.classList.add('in');
                
                setTimeout(() =>{
                    li.classList.replace('hide', 'visible');
                }, 1);
    
                setTimeout(() =>{
                    li.classList.replace('in', 'out');
                }, 15);
    
    
                // Ul children must not exceend 3
                // therefore:
    
                if(ul.children.length > 3){
                    ul.lastElementChild.remove();
                }
            
        }



    },

    deleteHistory(){


        const ul = document.querySelector('ul.hstry-list');
        let delay = 0;
        if(ul.children.length){
            const ulChildren = ul.children;
            for(let i= ulChildren.length - 1; i>=0; i--){
                delay+= 100
                setTimeout(() =>{
                    ulChildren[i].classList.add('slideOut');
                }, delay);
            }

            const interval = setInterval(() =>{
                Array.from(ul.children).forEach(el =>{
                    if(el.classList.contains('slideOut')){
                        ul.children[ul.children.length - 1].remove();
                    }
                });
            }, 550);

            const interval_ = setInterval(() =>{
                if(!ul.children.length){
                    clearInterval(interval);
                    clearInterval(interval_);
                }
            }, 0);
        }

       
    },

    deleteinputVal(e){


        let inputField = document.querySelector('.input-area');
        if(e.target.classList.contains('del-icon--input') || e.target.tagName === 'SPAN' || e.target.hasAttribute('src')){
            const arrOfSlittedStr = inputField.value.split('');
            arrOfSlittedStr.pop()
            inputField.value = arrOfSlittedStr.join('');
        }
        

    },

    
    clearInputField(){


        let inputField = document.querySelector('.input-area');
        inputField.value = '';


    },


    clearAll(){


        let inputField = document.querySelector('.input-area');
        const lastEntry = document.querySelector('.entry');

        inputField.value = '';
        lastEntry.textContent = ''
    },



    selectHistory(e){


        let inputField = document.querySelector('.input-area');
        const lastEntry = document.querySelector('.entry');

        if(e.target.tagName === 'DIV' || e.target.tagName === 'SPAN'){
            lastEntry.textContent = e.target.parentNode.children[0].textContent;
            inputField.value = e.target.parentNode.children[1].textContent;
        }
        
        e.stopPropagation();

    }

}



const events = {

    callWindow(){

        window.addEventListener('load', pageLoader.active);

    },

    callUserHelper(){

        const userGuideContainer = document.querySelector('.helper-content-wrapper');
        userGuideContainer.addEventListener('click', e =>{
            tips.activeUserTips(e);
        });

    },

    callShowInputVal(){

        const buttonContainer = document.querySelector('.button-wrapper');
        buttonContainer.addEventListener('click', e =>{
            calculator.displayValue(e);
        });
        
    },

    callShowResult(){

        const result = document.getElementById('evaluate');
        result.addEventListener('click', calculator.evaluate);

    },

    callClearHistory(){

        const delIcon__History = document.querySelector('.del-icon--hstry');
        delIcon__History.addEventListener('click', calculator.deleteHistory);

    },

    callDelInputVal(){

        const backspace = document.querySelector('.del-icon--input');
        backspace.addEventListener('click', e =>{
            calculator.deleteinputVal(e);
        });

    },

    callClearInputField(){

        const clearEntry = document.getElementById('clearEtry');
        clearEntry.addEventListener('click', calculator.clearInputField);

    },

    callClearAllField(){

        const clearAllFields = document.getElementById('clearAl')
        clearAllFields.addEventListener('click', calculator.clearAll);

    },

    callSelectHistory(){

        const ul = document.querySelector('ul.hstry-list');
        ul.addEventListener('click', e =>{
            calculator.selectHistory(e);
        });

    },

    callCloseTip(){

        tips.closeUserTip();

    }

}


events.callWindow();
events.callCloseTip();
events.callUserHelper();
events.callShowResult();
events.callDelInputVal();
events.callShowInputVal();
events.callClearHistory();
events.callClearAllField();
events.callSelectHistory();
events.callClearInputField();


