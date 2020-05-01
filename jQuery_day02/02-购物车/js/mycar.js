$(function () {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $(".checkall").change(function () {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            //让所有的商品添加 check-cart-item 这个类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除这个类名
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。 通过小的复选框来判断全选按钮
    $(".j-checkbox").change(function () {
        // if(被选中的小的复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        console.log($(".j-checkbox:checked").length);
        // $(".j-checkbox:checked").length  被选中的复选框的个数   $(".j-checkbox").length  所有复选框的个数
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            //让所有的商品添加 check-cart-item 这个类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除这个类名
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })
    // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    $(".increment").click(function () {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        //当前商品价格  p
        // var p = $(this).parent().parent().siblings(".p-price").html();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // parents(".p-num") 返回指定的祖先元素
        // 因为单价的格式是 ￥12.60  所以要截取字符串，从序列号为（1）截取到最后
        p = p.substr(1);
        var price = (p * n).toFixed(2); //保留两位小数
        //小计模块     .html()  括号为空 就是把其内容取出来  （）里面有值，就是把值给写进去
        // $(this).parent().parent().siblings(".p-sum").html('￥' + p * n);
        $(this).parents(".p-num").siblings(".p-sum").html('￥' + price);
        getSum();
    })
    $(".decrement").click(function () {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false; //当前文本框为1 时，就不再进行以下n--的程序了
        }
        // console.log(n);
        n--;
        $(this).siblings(".itxt").val(n);
        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        //当前商品价格  p
        // var p = $(this).parent().parent().siblings(".p-price").html()
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // 因为单价的格式是 ￥12.60  所以要截取字符串，从序列号为（1）截取到最后
        p = p.substr(1);
        // var price = (p * n).toFixed(2); //保留两位小数
        //小计模块     .html()  括号为空 就是把其内容取出来  （）里面有值，就是把值给写进去
        // $(this).parent().parent().siblings(".p-sum").html('￥' + p * n);
        $(this).parents(".p-num").siblings(".p-sum").html('￥' + (p * n).toFixed(2));
        getSum();
    })
    //  4. 用户修改文本框的值 计算 小计模块  
    $(".itxt").change(function () {
        // 先得到文本框里面的值  乘以  当前商品的单价
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html('￥' + (p * n).toFixed(2));
        getSum();
    })
    // 5. 计算总计和总额模块
    function getSum() {
        var count = 0; //计算总件数
        var money = 0; //计算总价钱
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());

        })
        $(".amount-sum em").text(count); // 修改其text值
        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        })
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    // 6. 删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action").click(function () {
        $(this).parents(".cart-item").remove();
        getSum(); //每次删除完毕之后  商品总件数和总价格都会重新计算

    });

    // (2) 删除选中的商品
    $(".remove-batch").click(function () {
        //删除的是小的复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();

    })

    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();

    })

})