import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Stream, Video } from '../../components';
import { STORAGE_DOMAIN } from '../../constant';
import { useLanguageLayerValue } from '../../context/LanguageLayer';
import useWindowSize from '../../hooks/useWindowSize';

const useStyles = makeStyles(theme => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#e41a7f',
  },
}));

const HomeLeft = props => {
  const { Streammings, Videos, isLoading } = props;

  const history = useHistory();
  const classes = useStyles();

  const [width] = useWindowSize();
  const [{ language, home }] = useLanguageLayerValue();

  return (
    <>
      {/* <div>
        <div className='main__title'>
          <p>{home[language].following}</p>
        </div>
        <Following />
      </div> */}

      <div>
        <div className='main__title'>
          <p>{home[language].watchLive}</p>
        </div>

        <div
          className={`layoutFlex ${
            width > 1280
              ? 'layout-4'
              : width > 860
              ? 'layout-3'
              : width > 500
              ? 'layout-2'
              : 'layout-1'
          }`}
          style={{
            '--gap-column': '40px',
            '--gap-row': '40px',
          }}
        >
          {Streammings.map(el => (
            <div key={el._id} className='layoutFlex-item'>
              <Stream
                avatar={
                  el.user?.kyc.avatar?.path ? STORAGE_DOMAIN + el.user.kyc.avatar.path : undefined
                }
                avataPos={el.user?.kyc.avatar_pos}
                video={el}
                title={el.name}
                description={el.description}
                onClick={() => history.push('/live?s=' + el._id)}
              />
            </div>
          ))}
        </div>

        {isLoading && (
          <Box className={classes.loading} p={3}>
            <CircularProgress color='inherit' />
          </Box>
        )}
      </div>

      <div>
        <div className='main__title'>
          <p>{home[language].recommend}</p>
        </div>

        <div
          className={`layoutFlex ${
            width > 1280
              ? 'layout-4'
              : width > 860
              ? 'layout-3'
              : width > 500
              ? 'layout-2'
              : 'layout-1'
          }`}
          style={{
            '--gap-column': '40px',
            '--gap-row': '40px',
          }}
        >
          {Videos.map(el => (
            <div key={el._id} className='layoutFlex-item'>
              <Video
                avatar={
                  el.user?.kyc.avatar?.path ? STORAGE_DOMAIN + el.user.kyc.avatar.path : undefined
                }
                avataPos={el.user?.kyc.avatar_pos}
                video={el}
                title={el.name}
                description={el.description}
                onClick={() => history.push('/watch?v=' + el.short_id)}
              />
            </div>
          ))}
        </div>

        {isLoading && (
          <Box className={classes.loading} p={3}>
            <CircularProgress color='inherit' />
          </Box>
        )}
      </div>
    </>
  );
};

HomeLeft.propTypes = {
  Streammings: PropTypes.array.isRequired,
  Videos: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default HomeLeft;
