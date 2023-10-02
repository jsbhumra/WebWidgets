"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Switch } from '@mui/material';
import SearchBar from "@/widgets/SearchBar";
const AnalogClock = dynamic(() => import("@/widgets/AnalogClock"), {
  ssr: false,
});
const DigitalClock = dynamic(() => import("@/widgets/DigitalClock"), {
  ssr: false,
});
import allWidgets from '@/widgets/widgets'

const widgetComponents = {
  "AnalogClock": AnalogClock,
  "DigitalClock": DigitalClock,
  "SearchBar": SearchBar
}

export default function add() {
  const [widgets,setWidgets] = useState(allWidgets)
  const [currWidgetID,setCurrWidgetID] = useState('')
  const [currWidgetProps,setCurrWidgetProps] = useState('')

  function showPropOptions(elem,el){
    // console.log(el)
      resetOutline()
      elem.target.style.outlineColor = "rgb(101,163,13)"
        const newWidget = widgets.find((widget) => widget.id==el)
        setCurrWidgetID(newWidget.id)
        const WidgetProps = newWidget.props;
        console.log(WidgetProps)
        var newPropsArr = []
        for(var i in WidgetProps){
          newPropsArr.push([i, WidgetProps[i]]);
        }
        setCurrWidgetProps(newPropsArr)
        return;
  }

  function changeProps(el){
    const theseWidgets = widgets
    const elem = el.target.value
    for (var i = 0; i < theseWidgets.length; i++){
      if(theseWidgets[i].id==currWidgetID){
        theseWidgets[i].props[elem] == true ? theseWidgets[i].props[elem] = false : theseWidgets[i].props[elem] = true
        break
      }
    }
    // console.log(widgets)
    setWidgets([...theseWidgets])
    console.log(widgets)
  }

  function resetOutline(){
    const widgetlist = document.querySelectorAll('.widgetlist')
    widgetlist.forEach(elem => {
      elem.style.outlineColor = "rgb(255,255,255)"
    })
  }

    console.log(widgets)

    return (
      <>
        <div className="flex flex-wrap">
          {widgets.map((widget) => {
            const WidgetName = widgetComponents[widget.name];
            // const WidgetProps = Object.keys(widget.props);
            console.log(widget.name)
            console.log({...widget.props})
            return(
            <div key={widget.id} onClick={(elem)=>showPropOptions(elem,widget.id)} className="widgetlist relative w-[250px] h-[250px] cursor-pointer outline outline-offset-8 rounded-md m-4">
              <div className="w-full h-full m-0 p-0 pointer-events-none">
              <WidgetName {...widget.props} />
              </div>
              {/* {console.log(WidgetProps)} */}
            </div>
            )
          })}
           {console.log(currWidgetID)}
        </div>
        <div className="w-full h-auto">
          {currWidgetProps==''?<p>Select a component first!</p>:
            currWidgetProps.map((arr) => {
              const prop = arr[0]
              return(
                <div key={arr[0]}>
                  <h4>Would you like to change {arr[0]} feature?</h4>
                  <Switch value={prop} defaultChecked={arr[1]} onChange={(e) => changeProps(e)} />
                </div>
              )})}
        </div>
      </>
    );
}
