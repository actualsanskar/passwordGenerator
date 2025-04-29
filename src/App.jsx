import React, { useCallback, useEffect, useState, useRef } from "react";

const App = () => {
  const [passVal, setPassVal] = useState("");
  const [length, setLength] = useState(16);
  const [numbers, setNumbers] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);

  const passwordRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    const num = "0123456789";
    const char = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/\\~`";

    if (numbers) str += num;
    if (specialChar) str += char;

    for (let i = 1; i <= length; i++) {
      let strIndex = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(strIndex);
    }
    

    setPassVal(pass);
  }, [length, numbers, specialChar]);

  useEffect(() => {
    passGenerator();
  }, [length, numbers, specialChar]);

  const handleCopy = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, length); // no need
    window.navigator.clipboard.writeText(passVal);
  });

  const handleLength = (e) => {
    setLength(e.target.value);
  };
  const handleNum = (e) => {
    setNumbers(numbers => !numbers);
  };
  const handleSpecialChar = (e) => {
    setSpecialChar(specialChar => !specialChar);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-4xl text-center my-3">
          Password generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={passVal}
            readOnly
            ref={passwordRef}
            className="bg-white outline-none w-full py-1 px-3 text-black"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <label htmlFor="length">Length ({length})</label>
            <input
              type="range"
              id="length"
              min={8}
              max={35}
              value={length}
              onChange={handleLength}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-x-1">
            <label htmlFor="numbers">Numbers</label>
            <input
              type="checkbox"
              id="numbers"
              onChange={handleNum}
              defaultChecked={numbers}
            />
          </div>

          <div className="flex items-center gap-x-1">
            <label htmlFor="characters">Characters</label>
            <input
              type="checkbox"
              id="characters"
              onChange={handleSpecialChar}
              defaultChecked={specialChar}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
