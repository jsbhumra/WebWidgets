"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import { Switch } from "@mui/material";
import { Switch } from "@nextui-org/react";
import SearchBar from "@/widgets/SearchBar";
const AnalogClock = dynamic(() => import("@/widgets/AnalogClock"), {
  ssr: false,
});
const DigitalClock = dynamic(() => import("@/widgets/DigitalClock"), {
  ssr: false,
});
import Weather from "@/widgets/Weather";
import Calendar from "@/widgets/Calendar";
import NewCalendar from "@/widgets/NewCalendar";
import allWidgets from "@/widgets/widgets";

const widgetComponents = {
  AnalogClock: AnalogClock,
  DigitalClock: DigitalClock,
  SearchBar: SearchBar,
  Calendar: Calendar,
  NewCalendar:NewCalendar,
  Weather:Weather
};

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
}

export default function add() {
  const router = useRouter();
  const [widgets, setWidgets] = useState(allWidgets);
  const [currWidgetID, setCurrWidgetID] = useState("");
  const [currWidgetProps, setCurrWidgetProps] = useState("");
  const [screenHeight, screenWidth] = useWindowSize();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (elem, id) => {
    onOpen();
    showPropOptions(elem, id);
  };

  const screenSize = window.innerWidth;
  let currentScreen, currCols;
  switch (true) {
    case screenSize > 1200:
      currentScreen = "lg";
      currCols = 12;
      break;
    case screenSize < 1200 && screenSize > 996:
      currentScreen = "md";
      currCols = 10;
      break;
    case screenSize < 996 && screenSize > 768:
      currentScreen = "sm";
      currCols = 6;
      break;
    case screenSize < 768 && screenSize > 480:
      currentScreen = "xs";
      currCols = 4;
      break;

    default:
      currentScreen = "xxs";
      currCols = 2;
      break;
  }

  const getFromLS = (name, key) => {
    let ls = {};
    if (localStorage) {
      try {
        ls = JSON.parse(localStorage.getItem(name));
        return ls[key];
      } catch (e) {
        // console.log(e);
      }
    } else {
      {
      }
    }
  };

  const saveToLS = (name, key, value) => {
    if (localStorage) {
      localStorage.setItem(
        name,
        JSON.stringify({
          [key]: value,
        })
      );
    }
  };

  const originalWidgets = getFromLS("widgetStorage", "widgets");
  const originalLayouts = getFromLS("layoutStorage", "layouts");

  // console.log(originalLayouts);
  // console.log(originalWidgets);

  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );

  const [editWidgets, setEditWidgets] = useState(
    JSON.parse(JSON.stringify(originalWidgets))
  );

  const [currentLayout, setCurrentLayout] = useState(
    layouts[`${currentScreen}`]
  );

  const [currentWidget, setCurrentWidget] = useState(
    editWidgets[`${currentScreen}`]
  );

  // console.log(currentLayout);
  // console.log(currentWidget);

  useEffect(() => {
    if (currWidgetProps != "") {
      var theseProps = currWidgetProps;
      var l = currentLayout.length - 1;
      let newCurrWidget = currentWidget;
      // console.log(newCurrWidget[l]);
      for (var t = 0; t < theseProps.length; t++) {
        var thisProp = theseProps[t][0];
        // console.log(thisProp);
        // console.log(theseProps[t][1]);
        newCurrWidget[l].widget[thisProp] = theseProps[t][1];
      }
      setCurrentWidget(newCurrWidget);
      console.log(newCurrWidget);

      onLayoutChange();
      onWidgetChange();

      saveToLS("layoutStorage", "layouts", layouts);
      saveToLS("widgetStorage", "widgets", editWidgets);

      // getFromLS("layoutStorage","layouts")
      // getFromLS("widgetStorage","widgets")

      router.push("../config");
    }
  }, [currentWidget]);

  const onLayoutChange = () => {
    // console.log(layout)
    const thisLayout = layouts;
    thisLayout[`${currentScreen}`] = currentLayout;
    setLayouts(thisLayout);
  };

  function onWidgetChange() {
    const thisWidget = editWidgets;
    thisWidget[`${currentScreen}`] = currentWidget;
    setEditWidgets(thisWidget);
  }

  function showPropOptions(elem, el) {
    // console.log(el);
    resetOutline();
    elem.target.style.outlineColor = "rgb(101,163,13)";
    const newWidget = widgets.find((widget) => widget.id == el);
    setCurrWidgetID(newWidget.id);
    const WidgetProps = newWidget.props;
    const WidgetPropLabel = newWidget.propLabel;
    // console.log(WidgetProps);
    var newPropsArr = [];
    for (var i in WidgetProps) {
      newPropsArr.push([i, WidgetProps[i], WidgetPropLabel]);
    }
    setCurrWidgetProps(newPropsArr);
    return;
  }

  function changeProps(el) {
    const theseWidgets = widgets;
    const elem = el.target.value;
    for (var i = 0; i < theseWidgets.length; i++) {
      if (theseWidgets[i].id == currWidgetID) {
        theseWidgets[i].props[elem] == true
          ? (theseWidgets[i].props[elem] = false)
          : (theseWidgets[i].props[elem] = true);
        break;
      }
    }
    // console.log(widgets)
    setWidgets([...theseWidgets]);
    const newWidget = widgets.find((widget) => widget.id == currWidgetID);
    const WidgetProps = newWidget.props;
    const WidgetPropLabel = newWidget.propLabel;
    // console.log(WidgetProps);
    var newPropsArr = [];
    for (var i in WidgetProps) {
      newPropsArr.push([i, WidgetProps[i], WidgetPropLabel]);
    }
    setCurrWidgetProps(newPropsArr);
    // console.log(widgets);
    // console.log(currWidgetProps);
  }

  function resetOutline() {
    const widgetlist = document.querySelectorAll(".widgetlist");
    widgetlist.forEach((elem) => {
      elem.style.outlineColor = "rgb(255,255,255)";
    });
  }

  // console.log(widgets)
  var currentLength = 0;
  if (currentLayout != undefined) {
    currentLength = currentLayout[currentLayout.length - 1].i;
  }
  const [widgetCounter, setWidgetCounter] = useState(currentLength);

  const onAdd = () => {
    // const theseWidgets = widgets
    let thisWidget;
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i].id == currWidgetID) {
        thisWidget = widgets[i];
        break;
      }
    }
    // for(var i in currWidgetProps){
    //   newPropsArr.push([i, WidgetProps[i]]);
    // }
    if (currentLayout != undefined) {
      setCurrentLayout((prevLayout) => [
        ...prevLayout,
        {
          i: (widgetCounter * 1 + 1) * 1,
          x: Infinity,
          y: Infinity,
          w: 3,
          h: 4,
        },
      ]);
    } else {
      setCurrentLayout([
        {
          i: (widgetCounter * 1 + 1) * 1,
          x: Infinity,
          y: Infinity,
          w: 3,
          h: 4,
        },
      ]);
    }
    onLayoutChange();
    // console.log({
    //   i: widgetCounter + 1,
    //   widget: {name: thisWidget.name, theseProps }
    // })
    if (currentLayout != undefined) {
      setCurrentWidget((prevWidget) => [
        ...prevWidget,
        {
          i: (widgetCounter * 1 + 1) * 1,
          widget: { name: thisWidget.name },
        },
      ]);
    } else {
      setCurrentWidget([
        {
          i: (widgetCounter * 1 + 1) * 1,
          widget: { name: thisWidget.name },
        },
      ]);
    }
    // console.log(currentLayout);
    // console.log(currentWidget);
    setWidgetCounter(widgetCounter + 1);

    onWidgetChange();
    // toast.success("Widget Added");
  };

  return (
    <div className="bg-bgGradientDark h-screen overflow-x-hidden p-3">
      <div className="flex flex-wrap">
        {widgets.map((widget) => {
          const WidgetName = widgetComponents[widget.name];
          // const WidgetProps = Object.keys(widget.props);
          // console.log(widget.name);
          // console.log({ ...widget.props });
          return (
            <div
              key={widget.id}
              onClick={(elem) => handleOpen(elem, widget.id)}
              className="widgetlist relative w-[250px] h-[250px] cursor-pointer outline outline-offset-8 rounded-md m-6"
            >
              <div className="w-full h-full m-0 p-0 pointer-events-none">
                <WidgetName {...widget.props} />
              </div>
              {/* {console.log(WidgetProps)} */}
            </div>
          );
        })}
        {/* {console.log(currWidgetID)} */}
      </div>
      <div className="w-full h-auto ms-8 mt-8">
        {/* {console.log(JSON.stringify(currWidgetProps))} */}
        {currWidgetProps == "" ? (
          <p>Select a component to add!</p>
        ) : (
          <div className="">
            <Modal
              size="full"
              backdrop="blur"
              isOpen={isOpen}
              onClose={onClose}
              className="relative text-white bg-bgGradientLight rounded-md z-50 h-4/5 w-4/5"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-2xl text-center">
                      Customize Widget
                    </ModalHeader>
                    <ModalBody className="flex flex-row justify-evenly items-center">
                      <div className="widgetlist relative w-96 h-96 rounded-md m-6">
                        <div className="w-full h-full m-0 p-3 border-2 rounded-2xl pointer-events-none">
                          {widgets
                            .filter((widget) => widget.id == currWidgetID)
                            .map((widget) => {
                              const Wid = widgetComponents[widget.name];
                              return <Wid {...widget.props} />;
                            })}
                        </div>
                      </div>

                      <div className="min-h-96 p-4">
                        {currWidgetProps.map((arr) => {
                          const prompts = arr[2];
                          const prop = arr[0];
                          return (
                            <div key={arr[0]}>
                              <h4 className="text-xl my-2">
                                {/* Would you like to change {arr[0]} feature? */}
                                {prompts[prop]}
                              </h4>
                              <Switch
                                value={prop}
                                defaultSelected={arr[1]}
                                onChange={(e) => changeProps(e)}
                                color="warning"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={onClose}
                        className="text-xl"
                      >
                        Close
                      </Button>
                      <Button
                        color="primary"
                        variant="ghost"
                        onPress={onClose}
                        className="text-xl"
                        onClick={onAdd}
                      >
                        Add
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        )}
        {/* {currWidgetProps != "" ? (
          <Button
            color="warning"
            className="z-10 top-5 text-xl font-medium"
            onClick={onAdd}
          >
            Add
          </Button>
        ) : null} */}
      </div>
    </div>
  );
}
