import React from 'react';
import classnames from 'classnames'; 
import './tagsInfo.scss';

export default function (props) {
  const { tags } = props;
  // tags && tags.sort(function (a, b) {
  //   // var x = a.attribute.localeCompare(b.attribute);
  //   // if (x > 0) { return 1; }
  //   // if (x < 0) { return -1; }
  //   // return 0;
  //   retrun 
  // });
  return (
    <>
      {
        tags && tags.map((d, i) => {
          let cls = ['tag'];
          switch (d.attribute) {
            case '正面':
              cls.push('green');
              break;
            case '中性':
              cls.push('blue');
              break;
            case '负面':
              cls.push('red');
              break;
          }
          return <span
            key={i}
            styleName={cls.join(' ')}
            // styleName={classnames('tag', {
            //   'red': d.attribute === '负面',
            //   'green': d.attribute === '正面',
            //   'blue': d.attribute === '中性',
            // })}
            // styleName={(function () {
            //   let cls = ['tag'];
            //   switch (d.attribute) {
            //     case '正面':
            //       cls.push('green');
            //       break;
            //     case '中性':
            //       cls.push('blue');
            //       break;
            //     case '负面':
            //       cls.push('red');
            //       break;
            //   }
            //   return cls.join(' ');
            // })()}
          >
            {d.compTag}
          </span>;
        })
      }
    </>
  );
}

