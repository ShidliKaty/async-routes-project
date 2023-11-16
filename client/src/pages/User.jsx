import { Await, defer, useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";
import { getTodos } from "../api/todos";
import { getUser } from "../api/users";
import { PostCard, SkeletonPostCard } from "../components/PostCard";
import { TodoItem } from "../components/TodoItem";
import {
  Skeleton,
  SkeletonList,
  SkeletonSimpleText,
} from "../components/Skeleton";
import { Suspense } from "react";

function User() {
  const { userPromise, postsPromise, todosPromise } = useLoaderData();

  return (
    <>
      <h1 className="page-title">
        <SkeletonSimpleText resolve={userPromise}>
          {(user) => user.name}
        </SkeletonSimpleText>
      </h1>
      <div className="page-subtitle">
        <SkeletonSimpleText resolve={userPromise}>
          {(user) => user.email}
        </SkeletonSimpleText>
      </div>
      <div>
        <b>Company:</b>{" "}
        <SkeletonSimpleText resolve={userPromise}>
          {(user) => user.company.name}
        </SkeletonSimpleText>
      </div>
      <div>
        <b>Website:</b>{" "}
        <SkeletonSimpleText resolve={userPromise}>
          {(user) => user.website}
        </SkeletonSimpleText>
      </div>
      <div>
        <b>Address:</b>{" "}
        <SkeletonSimpleText resolve={userPromise}>
          {(user) => {
            `${user.address.street} ${user.address.suite} ${user.address.city}
          ${user.address.zipcode}`;
          }}
        </SkeletonSimpleText>
      </div>

      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={4}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <Await resolve={postsPromise}>
            {(posts) =>
              posts.map((post) => <PostCard key={post.id} {...post} />)
            }
          </Await>
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <li>
                <Skeleton short />
              </li>
            </SkeletonList>
          }
        >
          <Await resolve={todosPromise}>
            {(todos) =>
              todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
            }
          </Await>
        </Suspense>
      </ul>
    </>
  );
}

async function loader({ request: { signal }, params: { userId } }) {
  const posts = getPosts({ signal, params: { userId } });
  const todos = getTodos({ signal, params: { userId } });
  const user = getUser(userId, { signal });

  return defer({ postsPromise: posts, todosPromise: todos, userPromise: user });
}

export const userRoute = {
  loader,
  element: <User />,
};
