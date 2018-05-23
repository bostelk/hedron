/** HEDRON TIP **
  The config.js defines how the sketch file is used by Hedron.
**/

module.exports = {
  // Default title when sketch is loaded in (can be changed by user)
  defaultTitle: 'fdbk',
  // Params are values between 0 and 1 that can be manipulated by the user
  // these values are sent to the sketch every frame
  // e.g. Speed, scale, colour
  params: [
    {
      key: 'fade',
      defaultValue: .9
    },
    {
      key: 'xShift',
      defaultValue: .5,
      min: -10,
      max: 10
    },
    {
      key: 'yShift',
      defaultValue: .5,
      min: -10,
      max: 10
    },
    {
      key: 'aShift',
      defaultValue: .5,
      min: -10,
      max: 10
    },
    {
      key: 'dShift',
      defaultValue: .5,
      min: -10,
      max: 10
    },


  ],
  // Shots are single functions that can fire, as opposed to values that change
  // e.g. Explosions, Pre-defined animations
  shots: [
    {
      method: 'panic', // needs to be unique
      title: 'panic' // should be human
    }
  ]
}
