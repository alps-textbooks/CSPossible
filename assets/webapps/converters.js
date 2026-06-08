/*
 * Converters.js -- utility functions for converting between number bases
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Converts a binary number represented as a string to decimal.
 * @param str the binary string
 * @result the number string represented in decimal
 */
function binaryToDecimal(str) {
  return rBinToDecimal(str, 1);
}

/**
 *  Recursively converts a binary string to decimal equivalent.
 * @param str the base 2 binary string
 * @param the place value, initially 1 
 * @result a base 10 decimal string
 */
function rBinToDecimal(str, place) {
   if (str.length == 0)
      return 0;
   else if (str.charAt(str.length-1) == 0)
      return 0 + rBinToDecimal(str.substring(0,str.length-1), place * 2);
   else 
      return place + rBinToDecimal(str.substring(0,str.length-1), place * 2);
}

/**
 *  Recursively converts a decimal number to a binary string
 * @param n a number in base 10
 * @result a binary string with no leading 0s
 */
function decToBinary(n) {
   if (n == 0)
      return "";
   else if (n % 2 == 1) 
      return decToBinary(Math.floor(n/2)) + "1";
   else
      return decToBinary(Math.floor(n/2)) + "0";
}

/**
 * Converts a decimal value to a hex digit.
 * @param d the decimal digit
 * @result a hex digit, 0,...,F
 */
function decToHexDigit(d) {
   if (d < 10)
     return d;
   else {
     d = d - 10;
     return "ABCDEF".charAt(d);
   }
}

/**
 * Converts a decimal number to hexadecimal base 16.
 * @param n the decimal value
 * @result a hexadecimal (base 16) number
 */
function decToHex(n) {
   if (n == 0)
      return "";
   var rmdr = n % 16;
   return decToHex(Math.floor(n/16)) + decToHexDigit(rmdr);
}

/**
 * Converts a decimal digit to a digit in alternate base.
 * @param d the decimal number
 * @param base the alternate base
 * @result a digit in the range 0,...,Z
 */
function decToAltDigit(d, base) {
  if (base <= 10)
    return d;
  if (d < 10)
     return d;
  else {
     d = d - 10;
     return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(d);
  }
}

/**
 * Recursively converts a decimal number n into an alternate base.
 * @param n the decimal number
 * @param base the alternate base
 * @param a number in base, base
 */
function decToAltBase(n, base) {
  if (n == 0)
    return "";
  var rmdr = n % base;
  return decToAltBase(Math.floor(n/base), base) + decToAltDigit(rmdr, base);
}

/**
 * Pads a binary string to 5 0s
 * @param a binary string such as 101
 * @result the binary padded to 5 digits, 00101 
 */
function pad(str) {
  var len = str.length;
  for (k=len; k < 5; k++)
     str = "0" + str;
  return str;; 
}

/**
 * Pads a numeric string to n places
 * @param str a string representing a number e.g., 101
 * @param ndigits the number of digits in the result
 * @result the input string padded to ndigits
 */
function pad(str, ndigits) {
  var len = str.length;
  for (k=len; k < ndigits; k++)
     str = "0" + str;
  return str;; 
}

/**
 * Returns the default length for different base numbers
 * @param base the base of the number
 * @result 2 digits for bases greater than 10, etc
 */
function padLen(base) {
  if (base >= 10)
     return 2;
  else if (base >= 3)
     return 4;
  else if (base >= 2)
     return 8;
}


/**
 * Pads a number string to a different default length based on its base.
 * @param str the number rerpresented as a string
 * @param base the numbers base
 * @result the number paded to a default length
 */
function padForBase(str, base) {
  var len = str.length;
  var padlen = padLen(base);
  for (k=len; k < padlen; k++)
    str = "0" + str;
  return str;; 
}

/**
 * Determines the largest default number that can be reprsented in a 
 *  particular base. For example, base 2 numbers use 8 bits as default.
 * @param the numbers base
 * @result the largest number that can be represented in a base.
 */
function limit(base) {
  if (base >= 10)
    return Math.pow(base,2) - 1;
  else if (base >= 3)
    return Math.pow(base,4) - 1;
  else
    return Math.pow(base,8) - 1;     
}

/**
 * Converts s to a hex (base 16) string
 * @param s a string in some other base
 * @param a hex representation of s
 */
function numHex(s) {
  var a = s.toString(16);
  if ( (a.length % 2) > 0 ) { 
    a = "0" + a; 
  }
  return a;
}


