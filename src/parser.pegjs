start
  = one_time_space+

_=" "*

one_time_space
    =_ v:one_time _{return v}

one_time
    =
    now_add_hour
    /now_add_date
    /now_add_minute
    /now_add_second
    /now_set_date
    /now_set_hour
    /now_set_minute
    /subject

now_set_date
    =v:integer "日"{
        return {"type":"set_date","v":v}
    }

now_set_hour
    =v:integer "時"{
        return {"type":"set_hour","v":v}
    }

now_set_minute
    =v:integer "分"{
        return {"type":"set_minute","v":v}
    }

now_add_second
    =v:integer "秒後"{
        return {"type":"add_second","v":v}
    }

now_add_minute
    =v:integer "分後"{
        return {"type":"add_minute","v":v}
    }

now_add_hour
    =v:integer "時間後"
    /v:integer "時後"{
        return {"type":"add_hour","v":v}
    }

now_add_date
    =v:integer "日後"{
        return {"type":"add_date","v":v}
    }
    /("明日"/"あす"){
        return {"type":"add_date","v":1}
    }
    /("明後日"/"あさって"){
        return {"type":"add_date","v":2}
    }
    /("昨日"/"きのう"){
        return {"type":"add_date","v":-1}
    }

subject
    =v:.+{return {"type":"subject","v":v.join("")}}

integer "integer"
  = digits:one_number+ {
       return parseInt(digits.join(""), 10); 
    }

one_number "integer"
    =digits:[0-9] { return digits }
    /digits:[一二三四五六七八九十] { 
        let v=0;
        //一二三四五六七八九十
        switch (digits) {
            case "一":
                v="1"
                break;
            case "二":
                v="2"
                break;
            case "三":
                v="3"
                break;
            case "四":
                v="4"
                break;
            case "五":
                v="5"
                break;
            case "六":
                v="6"
                break;
            case "七":
                v="7"
                break;
            case "八":
                v="8"
                break;
            case "九":
                v="9"
                break;
            case "十":
                v="10"
                break;
            }
            return v
        }
    /digits:[１２３４５６７８９０] { 
        let v=0;
        //一二三四五六七八九十
        switch (digits) {
            case "１":
                v="1"
                break;
            case "２":
                v="2"
                break;
            case "３":
                v="3"
                break;
            case "４":
                v="4"
                break;
            case "５":
                v="5"
                break;
            case "６":
                v="6"
                break;
            case "７":
                v="7"
                break;
            case "８":
                v="8"
                break;
            case "９":
                v="9"
                break;
            case "０":
                v="0"
                break;
            }
            return v
        }
