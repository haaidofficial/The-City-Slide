import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import fullStarIcon from '../../assets/icons/full-star.png';
import halfStarIcon from '../../assets/icons/half-star.png';

interface Photo {
    "images": {
        "small": Image;
        "thumbnail": Image;
        "original": Image;
        "large": Image;
        "medium": Image;
    };
    "uploaded_date": string;
    "caption": string;
    "id": string;
    "helpful_votes": string;
    "published_date": string;
    "user": {
        "user_id": null,
        "member_id": "0",
        "type": "user"
    }
}

interface Image {
    "width": string;
    "url": string;
    "height": string;
}

interface NeighborhoodInfo {
    "location_id": string;
    "name": string;
}

interface Hours {
    "week_ranges": Array<Array<[
        {
            "open_time": number,
            "close_time": number
        }
    ]>>
    "timezone": string;
}

interface Cuisine {
    "key": string;
    "name": string;
}

interface EstablishmentTypes {
    "key": string;
    "name": string;
}

interface LocationCardProp {

    data: {
        "location_id": string;
        "name": string;
        "latitude": string;
        "longitude": string;
        "num_reviews": string;
        "timezone": string;
        "location_string": string;
        "photo": Photo;
        "awards": Array<any>;
        "ranking_position": string;
        "ranking": string;
        "distance": string;
        "distance_string": string;
        "rating": string;
        "is_closed": boolean
        "open_now_text": string;
        "price": string;
        "neighborhood_info": NeighborhoodInfo[],
        "description": string;
        "web_url": string;
        "write_review": string;
        "nearest_metro_station": Array<any>,
        "phone": string;
        "website": string;
        "email": string;
        "address": string;
        "hours": Hours,
        "is_candidate_for_contact_info_suppression": boolean;
        "cuisine": Cuisine[];
        "establishment_types": EstablishmentTypes[]

    }

}


function generateStarRatings(rating: string) {
    const ratings: React.ReactElement[] = [];
    if (rating) {

        const [fullStar, halfStar] = rating.split('.');

        if (fullStar) {
            for (let i = 0; i < parseInt(fullStar); i++) {
                ratings.push(<img style={{ width: '17px', height: '17px' }} src={fullStarIcon} alt='full star rating' />);
            }
        }
        if (halfStar) {
            ratings.push(<img style={{ width: '17px', height: '17px' }} src={halfStarIcon} alt='half star rating' />)
        }
    }


    return ratings;

}

export function LocationCard({ data }: LocationCardProp) {
    const photo = data.photo;
    let image = '';
    if (photo) {

        image = photo.images.original.url;

    }

    let cuisine: Cuisine[] = [];
    if (data.cuisine) {
        cuisine = data.cuisine;
    }


    const starRatings = generateStarRatings(data.rating);


    return (
        <>
            <Card raised sx={{ width: "100%", marginBottom: '60px' }}>
                <CardMedia
                    sx={{ height: 260 }}
                    image={image}
                    title="location image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Box>
                        {starRatings}
                        Out of {data.num_reviews} reviews
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {data.description}
                    </Typography>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>Price</p>
                            <p>{data.price}</p>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>Ranking</p>
                            <p>{data.ranking}</p>
                        </Box>
                    </Box>
                    <Box>
                        {
                            cuisine.map((tag: Cuisine, index: number) => {
                                return <Chip sx={{ minWidth: '50px', marginRight: '5px', marginTop: '7px' }} key={index} label={tag.name} />
                            })
                        }
                    </Box>

                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                            <LocationOnIcon />
                            {data.address}
                            {/* <p>19 Ashoka Road Connaught Place, New Delhi 110001 India</p> */}
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>

                    <a href={data.write_review} target='_blank'  rel="noopener noreferrer"><Button size="small">SEE PUBLIC</Button></a>
                    <a href={data.website} target='_blank' rel="noopener noreferrer"><Button size="small">REVIEWS WEBSITE</Button></a>
                </CardActions>
            </Card>
        </>
    );
}
