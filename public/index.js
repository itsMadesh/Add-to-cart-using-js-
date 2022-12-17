updateCart = (id,value) =>{
    $.ajax({
        method:"POST",
        url:"user/cart",
        contentType:"application/json",
        data:JSON.stringify({
            "cart":cart,
        }),
        dataType:"json",
        success:function(res){
            // location.reload();
            console.log("cart updated successfully");
            items_count[id]=value;
            console.log(items_count[id]);
        }

        
    });
}


increment = (e) =>{
    cart = cart || {}
    if(!cart[e.value]){
        cart[e.value]=1;
    }
    else{
        cart[e.value]+=1;
    }
    updateCart(e.value,cart[e.value]);
    
}

decrement = (e) =>{
    cart = cart || {}
    if(cart[e.value]==1){
        delete cart[e.value];
    }
    else{
        cart[e.value]--;
    }
    updateCart(e.value,cart[e.value]);
}


let items=null

let cart=null;

let items_count={};

set_count = ()=>{
    items.forEach(item => {
        const id=item._id;
        if(cart[item._id]){
            items_count[id]=cart[item._id];
        }
        else{
            items_count[id]=0;
        }
    })
    console.log(items_count);   
}


const itemsView = ()=>{
    items.forEach(item => {
        
        const value = `<div class="container">
            <div class="wrapper">
                <div>
                    <h2>${item.name}</h2>
                    <p>${item.category}</p>
                </div>
                <div>
                    <button type="button" class="btn-dec" value=${item._id} onclick="decrement(this)">-</button>
                    <button type="button" id="count" class="btn-add">${items_count[item._id]}</button>
                    <button type="button" class="btn-inc" value=${item._id} onclick="increment(this)" >+</button>            
                </div>
            </div>
        </div>
        `;
        $(".items").append(value);

    });
}


$(document).ready(function(){
    $.ajax({
        method:"GET",
        url:"items",
        contentType:"application/json",
        success:function(res){
            items=res;
            console.log(items);
        }
    });
    $.ajax({
        method:"GET",
        url:"user/cart",
        contentType:"application/json",
        success: async function(res){
            cart=res;
            await set_count();
            await itemsView();
            console.log(items);
            console.log(items_count);
            console.log(cart);
        }
    });
});

