import { useState } from "react";
import { Result } from "../components/Result";
import { Key } from "../components/Key";
import { KeyTypeEnum } from "../models/keyType";
import { CalcActionEnum } from "../models/calcAction";
import { OperatorEnum } from "../models/operator";
import { handledKeys } from "../models/handledKeys";
import useKeypress from "react-use-keypress";

export default function Home() {
  const [previousResult, setPreviousResult] = useState("");
  const [currentResult, setCurrentResult] = useState("0");
  const [operation, setOperation] = useState("");
  const [isShowingResult, setIsShowResult] = useState(true);

  const clear = () => {
    setCurrentResult("0");
    setPreviousResult("");
    setOperation(null);
    setIsShowResult(true);
  };

  const del = () => {
    if (isShowingResult) return;
    if (isNaN(parseFloat(currentResult))) clear();
    if (currentResult.length === 1) {
      setCurrentResult("0");
    } else {
      setCurrentResult(currentResult.slice(0, -1));
    }
  };

  const calculate = (previous: number, current: number): number => {
    let result: number = 0;

    if (operation === OperatorEnum.ADDITION) {
      result = previous + current;
    }

    if (operation === OperatorEnum.SUBTRACTION) {
      result = previous - current;
    }

    if (operation === OperatorEnum.MULTIPLICATION) {
      result = previous * current;
    }

    if (operation === OperatorEnum.DIVISION) {
      result = Math.round((previous / current) * 1000) / 1000;
    }

    return result;
  };

  const compute = () => {
    let result: number = 0;
    let previous: number = parseFloat(previousResult);
    let current: number = parseFloat(currentResult);

    if (isNaN(previous) || isNaN(current)) return;

    result = calculate(previous, current);

    setCurrentResult(result.toString());
    setPreviousResult("");
    setOperation(null);
    setIsShowResult(true);
  };

  const handleAction = (action: CalcActionEnum) => {
    if (action === CalcActionEnum.DEL) del();

    if (action === CalcActionEnum.RESET) clear();

    if (action === CalcActionEnum.EQUALS) compute();
  };

  const operate = (operand: OperatorEnum) => {
    if (currentResult === "") return;
    if (previousResult !== "") compute();
    setOperation(operand);
    setPreviousResult(currentResult + operand);
    setCurrentResult("");
  };

  const keyPress = (num: number | string) => {
    if (num === "." && currentResult.includes(".")) return;

    if (currentResult === "0") {
      setCurrentResult(num.toString());
    } else {
      setCurrentResult(currentResult + num);
    }

    setIsShowResult(false);
  };

  useKeypress(handledKeys, (event) => {
    if (event.key === "1") {
      console.log("1");
    } else {
      console.log(event);
    }
  });

  return (
    <div className="container mx-auto h-screen px-4">
      <div className="flex justify-center flex-col h-full">
        <Result equation={previousResult} result={currentResult} />
        <div className="mt-4 p-8 bg-gray-700 rounded-xl grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <Key
              text="7"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress("7")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="8"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress("8")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="9"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress("9")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="DEL"
              keyType={KeyTypeEnum.PRIMARY}
              keyClick={() => handleAction(CalcActionEnum.DEL)}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="4"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress("4")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="5"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress("5")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="6"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress("6")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="+"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => operate(OperatorEnum.ADDITION)}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="1"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress("1")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="2"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress("2")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="3"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress("3")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="&minus;"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => operate(OperatorEnum.SUBTRACTION)}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="."
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress(".")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="0"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => keyPress("0")}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="&divide;"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => operate(OperatorEnum.DIVISION)}
            />
          </div>
          <div className="col-span-1">
            <Key
              text="&times;"
              keyType={KeyTypeEnum.DEFAULT}
              keyClick={() => operate(OperatorEnum.MULTIPLICATION)}
            />
          </div>
          <div className="col-span-2">
            <Key
              text="RESET"
              keyType={KeyTypeEnum.PRIMARY}
              keyClick={() => handleAction(CalcActionEnum.RESET)}
            />
          </div>
          <div className="col-span-2">
            <Key
              text="="
              keyType={KeyTypeEnum.SECONDARY}
              keyClick={() => handleAction(CalcActionEnum.EQUALS)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
