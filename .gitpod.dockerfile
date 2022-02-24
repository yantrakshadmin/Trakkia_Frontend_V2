FROM gitpod/workspace-full

RUN bash -c ". .nvm/nvm.sh && nvm install 14.18.1 && nvm use 14.18.1 && nvm alias default 14.18.1"
RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.1/zsh-in-docker.sh)" -- \
    -t https://github.com/denysdovhan/spaceship-prompt \
    -p git \
    -p https://github.com/zsh-users/zsh-syntax-highlighting